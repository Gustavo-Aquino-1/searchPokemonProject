const imgPokemon = document.getElementById('imgPoke')
const namePokemon = document.getElementById('namePoke')
const input = document.getElementById('input')
const btn = document.getElementById('btn')

//quando usa-se o await nao retorna uma promisse pois ele 'ESPERA' (await) a execução acabar e nesse casso retorna a response direto

const fetchPokemon = async (pokemon) => {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) 
        const objPoke = await response.json()
        namePokemon.innerText = 'Loading...'
        return objPoke
    }catch(error){
        console.log('Ocorreu um erro na solicitação!',error)
    }

}

const renderPokemon = async (pokemon) => {
    const pokemonObj = await fetchPokemon(pokemon.toLowerCase())
    if(pokemonObj){
        imgPokemon.style.opacity = 1;
        namePokemon.innerText = pokemonObj.name
        imgPokemon.src = pokemonObj['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }else{
        namePokemon.innerText = 'Not Found :('
        imgPokemon.style.opacity = 0;
    }
    input.value = ''
}


btn.addEventListener('click',() => renderPokemon(input.value))
window.addEventListener('keypress',(key) => {
    if(key.key === 'Enter'){
        renderPokemon(input.value)
    }
})
