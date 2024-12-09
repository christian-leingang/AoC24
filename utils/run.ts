import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts";

export function getInput(dayPath: string, isTest: boolean): string {
  const fileName = isTest ? "input_test.txt" : "input.txt";
  return Deno.readTextFileSync(resolve(dayPath, fileName));
}

const isTest: boolean = Deno.args[0] === "test";
const parameter: number = isTest ? 1 : 0;
const day: string = Deno.args[parameter] ||
  new Date().getDate().toString().padStart(2, "0");
const input: string = getInput(`./day${day}/`, isTest);

import(`../day${day}/index.ts`).then((module) => {
  module.default(input);
});
