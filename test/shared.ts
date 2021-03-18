
export async function wait(time: number = 20): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
