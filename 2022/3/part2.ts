import { readFileSync } from 'fs';

const main = () => {
    const file = readFileSync('./2022/3/input.txt', 'utf-8');
    const lines = file.split(/\r?\n/);

    let commonItemTypes: string[] = [];
    for (let i = 2; i < lines.length; i += 3) {
        let firstRucksack = [...lines[i - 2]];
        let secondRucksack = [...lines[i - 1]];
        let thirdRucksack = [...lines[i]];

        //console.log(firstCompartment, ' | ',secondCompartment);

        let overlappingItems = firstRucksack.filter((value, index, self) => {
            return secondRucksack.indexOf(value) > -1 && self.indexOf(value) === index;
        });
        let overlappingItems2 = overlappingItems.filter((value, index, self) => {
            return thirdRucksack.indexOf(value) > -1 && self.indexOf(value) === index;
        });


        if(overlappingItems2.length > 1) {
            console.log(overlappingItems2);
            throw Error(`More than one overlapping items in compartments in rucksack ${i}`);
        }

        commonItemTypes = commonItemTypes.concat(overlappingItems2);
        //console.log(overlappingItems);
        //console.log(commonItemTypes);
        
        console.log(i);
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