export const shuffleString = (stringArrayToShuffle: string[]): string => {
    for (var i = stringArrayToShuffle.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = stringArrayToShuffle[i];
        stringArrayToShuffle[i] = stringArrayToShuffle[j];
        stringArrayToShuffle[j] = temp;
    }

    return stringArrayToShuffle.join('');
}

export const getRandomChar = (charList: string, nbChars: number): string => {
    var randomPick = "";

    for(let i = 0; i < nbChars; i++) {
        const minCeiled = Math.ceil(0);
        const maxFloored = Math.floor(charList.length);
        const random = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

        randomPick += charList[random]
    }

    return randomPick;
}