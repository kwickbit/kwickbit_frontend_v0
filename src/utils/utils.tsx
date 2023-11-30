
export function abbreviateAddr(addr: string, frontCnt: number = 3, endCnt: number = 4): string {
    if (addr.length <= 8) return addr;
  
    return addr.slice(0, frontCnt) + "..." + addr.slice(-endCnt);
}
