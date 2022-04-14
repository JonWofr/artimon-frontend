/**
 * This project uses the same ethereum-blockies package as MetaMask which is different
 * than the normal ethereum-blockies package. The one from MetaMask does not come with
 * typings.
 */
declare module 'ethereum-blockies' {
    export const toDataUrl: (seed: string) => string
}