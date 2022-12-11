import { readFileSync } from 'fs';

const main = () => {
    const file = readFileSync('./2022/3/input.txt', 'utf-8');
    const lines = file.split(/\r?\n/);

    let commonItemTypes: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log(line);
        const chars = [...line];
        if(chars.length % 2 !== 0) {
            throw Error('Not even number of items in rucksack');
        }

        let firstCompartment = chars.slice(0, chars.length / 2);
        let secondCompartment = chars.slice(chars.length / 2);

        //console.log(firstCompartment, ' | ',secondCompartment);

        let overlappingItems = firstCompartment.filter((value, index, self) => {
            return secondCompartment.indexOf(value) > -1 && self.indexOf(value) === index;
        });

        if(overlappingItems.length > 1) {
            console.log(overlappingItems);
            throw Error(`More than one overlapping items in compartments in rucksack ${i}`);
        }

        commonItemTypes = commonItemTypes.concat(overlappingItems);
        //console.log(overlappingItems);
        //console.log(commonItemTypes);
    }

    console.log(commonItemTypes);

    const commonItemTypesPriorities = commonItemTypes.map((value) => getItemPriority(value));
    const prioritySum = commonItemTypesPriorities.reduce((prev, curr) => prev + curr, 0);

    console.log(prioritySum);
}

const getItemPriority = (item: string) => {
    if(item === item.toLowerCase()) {
        return item.toUpperCase().charCodeAt(0) - 64;
    }

    return item.toUpperCase().charCodeAt(0) - 64 + 26;
}



console.log(main());