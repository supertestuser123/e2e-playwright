import { test } from '@playwright/test';

/**
 * Decorator that wraps a function with a Playwright test step.
 * Used for reporting purposes.
 *
 * @example
 ```
 import { step } from './allure';
 class MyTestClass {
    @step("открыть страницу ")
    async open() {
        // Test code goes here
    }
    @step("Заполнить поле пароль $0")
    async fillPassword(pass) {
        // Test code goes here
    }
  }
 ```
 */
export const step =
  (stepNameTemplate: string) =>
  <Fn, Args extends never[]>(
    target: (this: Fn, ...args: Args) => Promise<Fn>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    _ctx: unknown,
  ) => {
    async function replacementMethod(this: Fn, ...args: Args): Promise<Fn> {
      const stringArgs = args.map((arg) => {
        if (typeof arg === 'object') return JSON.stringify(arg);

        return arg;
      });
      const fullNameStep = getFullNameStep(stepNameTemplate, stringArgs);
      // eslint-disable-next-line playwright/require-top-level-describe,newline-before-return
      return test.step(fullNameStep, async () => target.call(this, ...args));
    }

    return replacementMethod;
  };

const getFullNameStep = (stepNameTemplate: string, args: string[]) => {
  const countInsertArgumentsInStep = stepNameTemplate.match(/(\$\d+)|(\$)/g);
  if (countInsertArgumentsInStep) {
    return countInsertArgumentsInStep.reduce((acc, el) => {
      if (el === '$') return acc.replace('$', args[0]);
      const numArgs = Number(el.replace('$', ''));
      acc = acc.replace(el, args[numArgs]);

      return acc;
    }, stepNameTemplate);
  }

  return stepNameTemplate;
};

