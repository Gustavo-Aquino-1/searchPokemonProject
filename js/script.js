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
    if(pokemonObj && pokemonObj.name !== undefined){
        namePokemon.innerText = pokemonObj.name
        imgPokemon.src = pokemonObj['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }else{
        namePokemon.innerText = 'Not Found :('
        imgPokemon.src = '../imgs/pokeWord.png'
    }
    input.value = ''
}

btn.addEventListener('click',() => renderPokemon(input.value))
window.addEventListener('keypress',(key) => {
    if(key.key === 'Enter'){
        renderPokemon(input.value)
    }
})

imgPokemon.addEventListener('click',() => {
    if(imgPokemon.className.includes('animation')){
        imgPokemon.classList.remove('animation')
    }else{
        imgPokemon.classList.add('animation')
    }

})

//Forma alternativa
/* const fetchPokemon = async (poke) => {
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${poke}`
        const response = await fetch(url)
        const objPoke = await response.json() 
        const name = objPoke.name
        const img = objPoke['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        const pokeInfos = {name,img}
        return pokeInfos
    }catch{
        namePokemon.innerText = 'Not Found :('
    }
}

const renderPokemon = async (poke) => {
    const pokeInfos = await fetchPokemon(poke.toLowerCase())
    if(pokeInfos){
        imgPokemon.style.opacity = 1
        namePokemon.innerText = pokeInfos.name
        imgPokemon.src = pokeInfos.img
    }else{
        imgPokemon.style.opacity = 0
    }
}
 */