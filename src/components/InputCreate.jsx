import { useState } from "react"


const InputCreate = () => {
  const [inputValue, setInputValue] = useState('');
  const urlApi = 'http://localhost:3000/create'

  const addTask = async () => {
    const payload = { title: inputValue}

    try {
      const task = await fetch (urlApi, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
      });

      if(!task.ok) { throw new Error(`Error ${task.status}: ${task.statusText}`)} // fetch no devuelve error si ocurre. Hay que controlarlo manualmente
      
      const data = await task.json();
      console.log('Tarea añadida con éxito', data)

    } catch (error) {
      console.error('Error al añadir la tarea', error)
    }
  }

  // handleSubmit se encarga de:
    // - Prevenir el comportamiento por defecto del form
    // - Validadr que el input no esté vacío
    // - Enviar la tarea a la API con fetch
    // - Limpiar el input una vez enviada la tarea

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() !== '')
    addTask()
    setInputValue('') // Limpiar input al finalizar
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        id="task"
        type="text"
        name="task"
        placeholder="Título de la tarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Crear tarea</button>
    </form>
    </>
  )
}

export default InputCreate;







/*
Crea un componente llamado `InputCreate.jsx` donde crearás un `input` y un `botón`
- La funcionalidad será que al insertar la tarea en el input y darle al botón enviar se añadirá a nuestra BBDD y por tanto desde la ruta `"/"`
podremos ver todos las tareas anteriores junto con las que añadamos desde React

## PISTAS
- Recuerda que lo que mandamos a BBDD desde POSTMAN es el `{ title }`. El ID se crea solo.
- Es un método POST al endpoint `/create`del BACK. Revisa que es correcto para poder crear tu envío
- Con el método `fetch` puedes añadir la url del end point y lo que queremos pasarle a esa URL. 
```js
//ejemplo
fetch(urlApi, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
      })
*/