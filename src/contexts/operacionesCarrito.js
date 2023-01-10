
//determina si el pokemon está en el carrito. si está, indica la posicion del pokemon para agregar o quitar. sino, devuelve un -1
function pokemonEnCarrito(pokemon,carrito){
    //la estructura dentro del carrito es {cantidad: X , pokemon : pokemonObject} que dentro de pokemon tiene el id
    let ret = -1
    carrito.map((objeto,index)=>{
        if(pokemon.id == objeto.pokemon.id){
            ret = index
        }
    })
    return ret
}

// agrega o quita a la cuenta tanto total como del item
//si suma es true, es suma, sino, es resta
export function count(cuenta,esSuma){
    if (esSuma){
        // es suma, suma ilimitado (faltaria validacion por stock)
        cuenta = cuenta + 1;
    }
    else{
        //es resta, si cuenta es cero, deja de restar
        if (cuenta > 0){
            cuenta = cuenta -1;
        }
        //sino, cuenta = 0
    }

    return cuenta
}

export function countItem(){

    return
}

export function agregaCarrito(total,pokemon, carrito){
    //si el pokemon está en el carrito, cambia la cantidad. si no está en el carrito pushea el pokemon con cantidad 1
    const indicePokemon = pokemonEnCarrito(pokemon,carrito)
    //el pokemon está
    if (indicePokemon > -1){
        carrito[indicePokemon].cantidad = carrito[indicePokemon].cantidad + 1 
    }
    //el pokemon no está
    else{
        carrito.push({cantidad : 1, pokemon: pokemon})
    }

    return carrito
}

export function quitaCarrito(total,pokemon, carrito){
    //si el pokemon está en el carrito, cambia la cantidad. si no está en el carrito pushea el pokemon con cantidad 1
    const indicePokemon = pokemonEnCarrito(pokemon,carrito)
    //el pokemon está
    if (indicePokemon > -1){
        //si la cantidad que hay en el carrito es mayor a cero, resta
        const cantidad = carrito[indicePokemon].cantidad
        if (cantidad > 0){
            carrito[indicePokemon].cantidad = cantidad - 1
        //si la cantidad queda en cero dentro del carrito, tiene que eliminar el objeto que tenga el indicePokemon
            if (carrito[indicePokemon].cantidad == 0){
                carrito.splice(indicePokemon)
            }
        }
    }
    //el pokemon no está
    else{        
        alert('Pokemón no está en el carrito')
    }

    return carrito
}