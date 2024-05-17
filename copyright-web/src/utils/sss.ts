import { getBytes, toQuantity } from 'ethers'

export interface SecretUnit {
    index: number
    threshold: number
    value: number[]
}

type Poly = (index: number) => number

export function splitSecret(
    secret: Uint8Array,
    n: number,
    t: number
): SecretUnit[] {
    const secretLen = secret.length
    const secretUnits: SecretUnit[] = new Array<SecretUnit>(n)

    for (let i = 0; i < n; i++) {
        secretUnits[i] = {
            index: i + 1,
            threshold: t,
            value: new Array<number>(secretLen)
        }
    }

    for (let i = 0; i < secretLen; i++) {
        const parts = split(secret[i], n, t)

        for (let j = 0; j < n; j++) {
            secretUnits[j].value[i] = parts[j]
        }
    }

    return secretUnits
}

export function combineParts(parts: SecretUnit[]): number[] {
    const threshold = parts[0].threshold
    const secretLen = parts[0].value.length
    const { coeffs, values } = makeMatrix(parts, threshold, secretLen)
    const { coeffs: newCoeffs, values: newValues } = extinction(coeffs, values)
    return remainder(newCoeffs, newValues)
}

export function recoverSecret(parts: SecretUnit[]): Uint8Array {
    return new Uint8Array(combineParts(parts));
}


function makeMatrix(
    parts: SecretUnit[],
    threshold: number,
    secretLen: number
): { coeffs: number[][]; values: number[][] } {
    const coeffs: number[][] = new Array<number[]>(threshold)
    const values: number[][] = new Array<number[]>(threshold)

    for (let i = 0; i < threshold; i++) {
        // Make coefficient matrix
        const coeffsRow: number[] = new Array<number>(threshold)
        coeffsRow[0] = 1
        const index = parts[i].index
        let mult = index

        for (let j = 1; j < threshold; j++) {
            coeffsRow[j] = mult
            mult *= index
        }

        coeffs[i] = coeffsRow

        // Make augmented matrix
        values[i] = new Array<number>(secretLen)
        for (let j = 0; j < secretLen; j++) {
            values[i][j] = parts[i].value[j]
        }
    }

    return { coeffs, values }
}

function split(M: number, n: number, t: number): number[] {
    const parts: number[] = new Array<number>(n)
    const poly = makePoly(M, t)

    for (let i = 0; i < n; i++) {
        parts[i] = poly(i + 1)
    }

    return parts
}


function makePoly(M: number, t: number): Poly {
    const coeffs: number[] = new Array<number>(t)
    coeffs[0] = M

    for (let i = 1; i < t; i++) {
        coeffs[i] = generateRandomInt(256)
    }

    return function (index: number): number {
        let part = M
        let mult = index

        for (let i = 1; i < t; i++) {
            part += mult * coeffs[i]
            mult *= index
        }

        return part % 256
    }
}


function extinction(
    coeffs: number[][],
    values: number[][]
): { coeffs: number[][]; values: number[][] } {
    if (coeffs.length === 1) {
        return { coeffs, values }
    }

    const valueLen = values[0].length
    const newCoeffs: number[][] = new Array<number[]>(coeffs.length - 1)
    const newValues: number[][] = new Array<number[]>(coeffs.length - 1)

    for (let i = 1; i < coeffs.length; i++) {
        const coeffsRow: number[] = new Array<number>(coeffs.length - 1)
        const base = coeffs[0][coeffs.length - 1]
        const mult = coeffs[i][coeffs.length - 1]

        for (let j = 0; j < coeffs.length - 1; j++) {
            coeffsRow[j] = coeffs[i][j] * base - coeffs[0][j] * mult
        }

        newCoeffs[i - 1] = coeffsRow

        const valueRow: number[] = new Array<number>(valueLen)
        for (let j = 0; j < valueLen; j++) {
            valueRow[j] = values[i][j] * base - values[0][j] * mult
        }

        newValues[i - 1] = valueRow
    }

    return extinction(newCoeffs, newValues)
}

function remainder(coeffs: number[][], values: number[][]): number[] {
    if (coeffs.length !== 1 || values.length !== 1) {
        return []
    }

    const r = coeffs[0][0]
    const value = values[0]
    const result: number[] = new Array<number>(value.length)

    for (let i = 0; i < value.length; i++) {
        let v = Math.floor(value[i] / r) % 256
        if (v < 0) {
            v += 256
        }
        result[i] = v
    }

    return result
}

export function generateRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function part2str(part: SecretUnit) {
    const arr = part.value.concat([part.threshold, part.index])
    return toQuantity(new Uint8Array(arr))
}

export function str2part(str: string): SecretUnit {
    const arr = getBytes(str)
    const length = arr.length
    const value = arr.slice(0, length - 2)
    const threshold = arr[length - 2]
    const index = arr[length - 1]
    return {
        value: Array.from(value),
        threshold,
        index
    }
}
