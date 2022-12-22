let number_of_city = 10;

let number_of_population = 500;
let number_of_generation = 300;
// number_of_parents = Math.floor(number_of_population / 2)

let crossover_probability = 80;
let mutation_probability = 20;

let Distance_between_cities= [];

for ( let i = 0 ; i < number_of_city ; i++ ) {
    Distance_between_cities[ i ] = [];
    for ( let j = 0 ; j <= i ; j++ ) {
        if(i == j){
            Distance_between_cities[ i ][ j ] = 0; 
        }
        else{
            random_distance = Math.floor(Math.random()*100);
            Distance_between_cities[ i ][ j ] = random_distance;
            Distance_between_cities[ j ][ i ] = random_distance;
        }
    }
}

// console.log(Distance_between_cities);
console.log( Distance_between_cities.join('\n') );

function permutation(n) {
    let arr = [];
    for ( let i = 0 ; i < n ; i++ ) {
        arr[i] = i;
    }
    // console.log(arr);
    let per = [];
    let step = n;
    for ( let j = 0 ; j < n ; j++ ) {
        random_number = Math.floor(Math.random() * step); 
        // console.log("this is a step : ",step,"this is a random : ",random_number);
        let temp = arr.splice(random_number,1)[0];
        per.push(temp);
        step--;
    }
    // console.log(per);
    return per;
}

class Existence {
    constructor(chromosome, Distance_between_cities){
        this.chromosome = chromosome;
        this.fitness = fitnessFunction(chromosome, Distance_between_cities);
    }
}

function fitnessFunction(chromosome, Distance_between_cities){
    fitness = 0;
    for ( let i = 0 ; i < chromosome.length ; i++ ){
        fitness += Distance_between_cities[chromosome[i]][chromosome[(i + 1) % chromosome.length]];
    }
    // console.log(fitness);
    return fitness;
}

function initialization(number_of_population, number_of_city, Distance_between_cities){
    let population = [];
    let counter = 0;
    for ( let i = 0 ; i < number_of_population ; i++) {
        let chromosome = permutation(number_of_city);
        // console.log(counter, ">>" ,chromosome);
        counter++;
        let existence = new Existence(chromosome, Distance_between_cities);
        population.push(existence);
    }
    return population;
}

function parentSelection(population, crossover_probability){
    let number_of_parents = crossover_probability * population.length / 100;
    // sorting population
    for( let i = 0; i < population.length; i++ ){
        for( let j = i + 1; j < population.length; j++ ){
            if(population[i].fitness > population[j].fitness){
                temp = population[i];
                population[i] = population[j];
                population[j] = temp;
            }
        }
    }
    // select best parents base on fitness
    let parents = [];
    for ( let i = 0 ; i < number_of_parents ; i++ ){
        parents.push(population[i])
    }
    // console.log(parents);    
    return parents;
}

function crossOver(parents, Distance_between_cities) {
    let offsprings = [];
    let length_of_parents_list = parents.length;
    for ( let i = 0 ; i < length_of_parents_list ; i+=2 ) {
        let parent1 = parents[i].chromosome;
        let parent2 = parents[i + 1].chromosome;
        node = Math.floor(Math.random() * parent1.length);
        // console.log('random node',node);
        let offspring2 = parent1.slice(0, node);
        let offspring1 = parent2.slice(0, node);
        // console.log("node : ", node);
        // console.log("parent1", parent1);
        // console.log("offspring1", offspring1);
        // console.log("parent2", parent2);
        // console.log("offspring2", offspring2);
        let length_of_parent = parent1.length;
        for ( let j = 0 ; j < length_of_parent ; j++ ) {
            if (!offspring1.includes(parent1[j])) {
                offspring1.push(parent1[j]);
            }
            if (!offspring2.includes(parent2[j])) {
                offspring2.push(parent2[j]);
            }
        }
        child1 = new Existence(offspring1, Distance_between_cities);
        child2 = new Existence(offspring2, Distance_between_cities);
        offsprings.push(child1);
        offsprings.push(child2);
    }
    // console.log(offsprings);
    return offsprings;
}

function mutation(offsprings, mutation_probability){
    for ( let i = 0 ; i < offsprings.length ; i++ ) {
        
    }
}

let Population = initialization(number_of_population, number_of_city, Distance_between_cities);
// console.log(Population);

// Main Loop
for ( let i = 0 ; i < number_of_generation ; i++ ) {
    let parents = parentSelection(Population, crossover_probability);
    let offsprings = crossOver(parents, Distance_between_cities);
    
}



let Maximum_loop_repetition = 20;   