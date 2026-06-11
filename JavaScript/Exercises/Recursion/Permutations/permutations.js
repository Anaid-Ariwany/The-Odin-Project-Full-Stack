const permutations = function (arr) {
    if (arr.length === 0) {
        return [[]];
    }

    const first = arr[0];
    const rest = arr.slice(1);
    const subPermutations = permutations(rest);

    let result = [];
    for (const perm of subPermutations) {
        for (let i = 0; i <= perm.length; i++) {
            const newPerm = [...perm.slice(0, i), first, ...perm.slice(i)];
            result.push(newPerm);
        }
    }

    return result;
};

// Do not edit below this line
module.exports = permutations;