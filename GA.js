let number_of_city = 0;

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let input_value = Number(e.target.input.value);
    number_of_city = input_value;
    GA(number_of_city);
});

function GA(number_of_city){
    if (number_of_city > 0){
        let number_of_population = 500;
    let number_of_generation = 300;
    
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
        // sorting population list
        for( let i = 0; i < population.length; i++ ){
            for( let j = i + 1; j < population.length; j++ ){
                if(population[i].fitness > population[j].fitness){
                    temp = population[i];
                    population[i] = population[j];
                    population[j] = temp;
                }
            }
        }
        let number_of_parents = crossover_probability * population.length / 100;
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
    
    function mutation(offsprings, mutation_probability, Distance_between_cities){
        for ( let i = 0 ; i < offsprings.length ; i++ ) {
            random_number = Math.floor(Math.random() * 100);
            if (random_number < mutation_probability) {
                // console.log(offsprings[i].chromosome);
                m = Math.floor(Math.random() * offsprings[i].chromosome.length);
                n = Math.floor(Math.random() * offsprings[i].chromosome.length);
                // console.log("old chromosome",offsprings[i].chromosome);
                // console.log("old fitness",offsprings[i].fitness);
                let temp = offsprings[i].chromosome[m];
                offsprings[i].chromosome[m] = offsprings[i].chromosome[n];
                offsprings[i].chromosome[n] = temp;
                // console.log("m : ",m,"n : ",n);
                // console.log("temp",temp);
                // console.log("new m",offsprings[i].chromosome[m]);
                // console.log("new n",offsprings[i].chromosome[n]);
                // console.log(offsprings[i].chromosome);
                new_value_of_offspring = new Existence(offsprings[i].chromosome, Distance_between_cities);
                offsprings[i] = new_value_of_offspring;
                // console.log("new chromosome",offsprings[i].chromosome);
                // console.log("new fitness",offsprings[i].fitness);
            }
        }
        // console.log("mutation list",offsprings);
        return offsprings;
    }
    
    function serviveSelection(population, number_of_population) {
        population.sort((a,b) =>{
            return a.fitness - b.fitness;
        })
        population = population.slice(0, number_of_population)
        return population;
    }
    
    let Population = initialization(number_of_population, number_of_city, Distance_between_cities);
    // console.log(Population);
    
    let Maximum_loop_repetition = 20;
    let loop_repetition = 0;   
    
    // Main Loop
    for ( let i = 0 ; i < number_of_generation ; i++ ) {
        let best_chromosome = Population[0];
        let parents = parentSelection(Population, crossover_probability);
        let offsprings = crossOver(parents, Distance_between_cities);
        offsprings = mutation(offsprings, mutation_probability, Distance_between_cities);
        Population = [...Population, ...offsprings];
        Population = serviveSelection(Population, number_of_population);
        if (best_chromosome.fitness == Population[0].fitness) {
            console.log(Population.length);
            loop_repetition += 1;
        }
        if (loop_repetition == Maximum_loop_repetition){
            break
        }
    }
    
    let best_answer = Population[0];
    console.log(best_answer);

    document.getElementsByClassName("container")[0].style.display = "flex";

    let matrix = document.getElementById("matrix");

    let matrix_value = "";
    for ( let i = 0 ; i < Distance_between_cities.length ; i++ ) {
        for ( let j = 0 ; j < Distance_between_cities[i].length ; j++ ) {
            matrix_value += Distance_between_cities[i][j] + "\t&nbsp&nbsp&nbsp&nbsp&nbsp";
        }
        matrix_value += "<br>";
    }
    matrix.innerHTML = matrix_value;

    let best_rote = document.getElementById("best-rote");

    let best_rote_value = "";
    for ( let i = 0 ; i < best_answer.chromosome.length ; i++ ) {
        best_rote_value += best_answer.chromosome[i] + "\t&nbsp&nbsp&nbsp&nbsp&nbsp";
    }
    best_rote.innerHTML = best_rote_value;
    
    let fitness_value = document.getElementById("fitness");
    fitness_value.innerText = best_answer.fitness;

    }
}

