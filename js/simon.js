  let niveles
  let keys
  let time
    swal({
      title: 'Juego de Memoria',
      width: 600,
      confirmButtonText:  'iniciar Juego',
      padding: '3em',
      backdrop: `
        rgba(0,0,123,0.4)
        url("img/76.gif")
        center left
        no-repeat
      `
    }).then((result) => {
        if (result.value) {
            // siguienteNivel(0);
          escogerNivel()
        }
      })


      function escogerNivel(){
        let level = document.getElementById('level')
        level.removeAttribute('hidden')
        let keyboard =  document.getElementById('keyboard')

      }

        function nivelJugar(level){
          if(level == 0){
            niveles = 2
            time = 1500
          }else if (level == 1){
           niveles = 10
           time = 1000
          }else {
           niveles = 10
           time = 500
          }

            keys= generarTeclas(niveles)
            siguienteNivel(0)
            $("#level").attr('hidden', true)
            keyboard.removeAttribute('hidden')
        }

        function siguienteNivel(nivelActual){
            if(nivelActual === niveles){
            return    swal({
               title: 'Ganaste',
               showConfirmButton: false,
               animation: false,
               customClass: 'animated tada',
               padding: '3em',
               backdrop: `
                 rgba(0,0,123,0.4)
                 url("img/winer.gif")
                 center left
                 no-repeat`
              })
            }

            swal({
              title: `Nivel ${nivelActual + 1}`,
              showConfirmButton: false,
              timer: time - 250
            })

            for(let i=0; i <= nivelActual; i++  ){
                setTimeout(()=> activate(keys[i]), time * (i+1))

            }
                let i = 0;
                let teclaActual = keys[i]
                window.addEventListener('keydown', onkey)
                function onkey(ev){
                    if(ev.keyCode == teclaActual){
                       activate(teclaActual, { success: true })
                       i++
                        if (i > nivelActual){
                                window.removeEventListener('keydown', onkey)
                                setTimeout(() => siguienteNivel(i), 1500)
                            }
                            teclaActual = keys[i]
                        }else{
                            activate(ev.keyCode , { fail:true })
                            window.removeEventListener('keydown', onkey)
                            setTimeout(() =>
                                       {
                                         swal({
                                           title: 'Perdiste',
                                           width: 600,
                                           confirmButtonText:  'Intentarlo de nuevo',
                                           padding: '3em',
                                           backdrop: `
                                             rgba(0,0,123,0.4)
                                             url("img/loser.gif")
                                             center left
                                             no-repeat`
                                     }).then((result) => {
                                         if (result.value) {
                                           siguienteNivel(0);
                                      }
                                  })
                            }, 1000)
                        }
                    }
                }


        function generarTeclas(niveles){
            // estoy generando un nuevo array con las posiciones de los niveles y a su vez llenandolo con 0, luego ejecuto el metodo map de los array de manera que me devuelva un nuevo valor por cada elemento del array en este caso la funcion generar una tecla
            return new Array(niveles).fill(0).map(generarUnaTecla)
        }

        function generarUnaTecla(){
            const min=65
            const max= 90
            return Math.round(Math.random() * (max - min) + min)
        }

        //de este manera por medio de javascript estamos llamando a todo el elemnto del Dom que contenga como key-code el atributo que se le pase como parametro
        function obtenerElementoCodigo(keyCode){
        return document.querySelector(`[data-key="${keyCode}"]`)
        }

        function activate(keyCode, opts = {}){
//              alert(keyCode);
            const el = obtenerElementoCodigo(keyCode)
            el.classList.add('active')
            if(opts.success){
                el.classList.add('success')
            }else if (opts.fail){
                el.classList.add('fail')
            }
            setTimeout(()=> desactivate(el), 500)


        }
        function desactivate(el){
            el.className='Key'
        }

//        function desactivate
