export function runAsyncAction(asyncFunc: () => Promise<void>): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    asyncFunc();
}
