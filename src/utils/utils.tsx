import createHash from "create-hash";

export function abbreviateAddr(addr: string, frontCnt: number = 3, endCnt: number = 4): string {
    if (addr.length <= 8) return addr;
  
    return addr.slice(0, frontCnt) + "..." + addr.slice(-endCnt);
}

export const computeDeduplicationId = (message: object): string => {
    // Convert the message to a string (if it's an object, you might want to use JSON.stringify)
    const messageString = JSON.stringify(message);
  
    // Create a SHA-256 hash from the message
    const hash = createHash('sha256');
    hash.update(messageString);
  
    // Convert the hash to a hexadecimal string to use as the deduplication ID
    return hash.digest('hex');
  }