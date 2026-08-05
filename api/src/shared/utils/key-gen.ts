export class KeyGen {
    static uniqueKey(): string{
        const curTimeInMillis = Date.now();
        const digits = curTimeInMillis.toString().split("");
        const keyMap: Record<string, string[]> = {
            "1": ["a", "A", "b", "B", "c", "C", "1"],
            "2": ["d", "D", "e", "E", "f", "F", "2"],
            "3": ["g", "G", "h", "H", "i", "I", "3"],
            "4": ["j", "J", "k", "K", "l", "L", "4"],
            "5": ["m", "M", "n", "N", "o", "O", "5"],
            "6": ["p", "P", "q", "Q", "r", "R", "6"],
            "7": ["s", "S", "t", "T", "7"],
            "8": ["u", "U", "v", "V", "8"],
            "9": ["w", "W", "x", "X", "9"],
            "0": ["y", "Y", "z", "Z", "0"]
        };
        let uniqueKey = "";
        digits.forEach(value => {
            if (keyMap[value]){
                uniqueKey += keyMap[value][this.rand(0, (keyMap[value].length - 1))]
            }else {
                uniqueKey += value;
            }
        })
        return uniqueKey;
    }

    static rand(min: number, max: number){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomUUID(){
        return crypto.randomUUID();
    }
}