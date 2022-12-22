let number_of_city = 10;

let number_of_population = 500;
let number_of_generation = 250;

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

function parentSelection(population, number_of_population){
    let parents = []
    for ( let i = 0 ; i < number_of_population ; i++ ){
        random_number = Math.floor(Math.random() * population.length);
        console.log(random_number);
        parents.push(population[random_number]);
    }
    return parents;
}

let Population = initialization(number_of_population, number_of_city, Distance_between_cities);
// console.log(Population);




let Maximum_loop_repetition = 20;   