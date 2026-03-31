document.addEventListener('DOMContentLoaded', () => {


    const btnCrear = document.getElementById('btnCrear');
    const btnEliminar = document.getElementById("btnEliminar");
    const btnActualizar = document.getElementById("btnActualizar");
    const btnFiltrar = document.getElementById("btnFiltrar");


    const modal = document.getElementById('modalOrden');
    const modalFiltro = document.getElementById('modalFiltro');


    const btnRegistrar = document.getElementById('btnRegistrar');
    const btnAplicarFiltro = document.getElementById('btnAplicarFiltro');


    const grid = document.getElementById("gridOrdenes");
    const estadoVacio = document.getElementById("estadoVacio");


    const inputProducto = document.getElementById('inputProducto');
    const inputDescripcion = document.getElementById('inputDescripcion');
    const inputPrecio = document.getElementById('inputPrecio');
    const inputCategoria = document.getElementById('inputCategoria');

    const filtroEstado = document.getElementById('filtroEstado');

    let modoEliminar = false;
    let modoActualizar = false;
    let cardSeleccionada = null;


    function verificarEstado() {
        if (grid.children.length === 0) {
            estadoVacio.style.display = "block";
            grid.style.display = "none";
        } else {
            estadoVacio.style.display = "none";
            grid.style.display = "grid";
        }
    }


    function resetModos() {
        modoEliminar = false;
        modoActualizar = false;

        document.body.classList.remove("modo-eliminar");
        document.body.classList.remove("modo-actualizar");

        btnEliminar.innerHTML = '<i class="ri-delete-bin-line"></i> Eliminar';
        btnActualizar.innerHTML = '<i class="ri-refresh-line"></i> Actualizar';
    }


    btnCrear.addEventListener("click", () => {
        resetModos();
        cardSeleccionada = null;

        inputProducto.value = "";
        inputDescripcion.value = "";
        inputPrecio.selectedIndex = 0;
        inputCategoria.selectedIndex = 0;

        modal.style.display = "flex";
    });


    btnEliminar.addEventListener("click", () => {
        modoEliminar = !modoEliminar;
        modoActualizar = false;

        document.body.classList.toggle("modo-eliminar");
        document.body.classList.remove("modo-actualizar");

        btnEliminar.innerHTML = modoEliminar
            ? '<i class="ri-close-line"></i> Cancelar'
            : '<i class="ri-delete-bin-line"></i> Eliminar';

        btnActualizar.innerHTML = '<i class="ri-refresh-line"></i> Actualizar';
    });


    btnActualizar.addEventListener("click", () => {
        modoActualizar = !modoActualizar;
        modoEliminar = false;

        document.body.classList.toggle("modo-actualizar");
        document.body.classList.remove("modo-eliminar");

        btnActualizar.innerHTML = modoActualizar
            ? '<i class="ri-close-line"></i> Cancelar'
            : '<i class="ri-refresh-line"></i> Actualizar';

        btnEliminar.innerHTML = '<i class="ri-delete-bin-line"></i> Eliminar';
    });


    btnFiltrar.addEventListener("click", () => {
        modalFiltro.style.display = "flex";
    });


    grid.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        if (modoEliminar) {
            card.remove();
            verificarEstado();
            return;
        }

        if (modoActualizar) {
            cardSeleccionada = card;

            inputProducto.value = card.querySelector(".nombre-producto").textContent;
            inputDescripcion.value = card.querySelector(".descripcion").textContent;
            inputPrecio.value = card.querySelector("#costo").textContent;
            inputCategoria.value = card.dataset.categoria;

            modal.style.display = "flex";
        }
    });


    btnRegistrar.addEventListener("click", () => {

        const producto = inputProducto.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const precio = inputPrecio.value;
        const categoria = inputCategoria.value;

        // ❗ VALIDACIÓN COMO ANTES
        if (!producto || !descripcion) {
            alert("⚠️ Debes completar todos los campos");
            return;
        }

        if (modoActualizar && cardSeleccionada) {

            cardSeleccionada.querySelector(".nombre-producto").textContent = producto;
            cardSeleccionada.querySelector(".descripcion").textContent = descripcion;
            cardSeleccionada.querySelector("#costo").textContent = precio;
            cardSeleccionada.querySelector("#categoria").textContent = categoria;

            cardSeleccionada.dataset.categoria = categoria;

            // 🔥 ANIMACIÓN
            cardSeleccionada.classList.add("actualizada");
            setTimeout(() => {
                cardSeleccionada.classList.remove("actualizada");
            }, 700);

        } else {

            const nuevaCard = document.createElement("div");

            nuevaCard.classList.add('card')
            nuevaCard.dataset.categoria = categoria



            nuevaCard.innerHTML = `
                <div class="container-image">
                        <img src="../images/productos/download-removebg-preview.png" alt="">
                    </div>

                    <div class="container-info">

                        <h2 class="nombre-producto">${producto}</h2>
                        <p class="descripcion-producto">Descripción: <span class="descripcion">${descripcion}</span></p>
                        <p class="categoria-producto">Categoría: <span id="categoria">${categoria}</span>
                        </p>

                        <p class="precio">Precio (RD$): <span id="costo">${precio}</span></p>


                        <button class="btn-carrito">

                            <img src="../images/productos/cart-arrow-down-svgrepo-com (1).svg" alt="Cart"
                                class="btn-img">
                            Añadir al carrito
                        </button>


                    </div>
            `;

            grid.appendChild(nuevaCard);
        }

        modal.style.display = "none";
        verificarEstado();
    });


    btnAplicarFiltro.addEventListener("click", () => {
        const categoria = filtroEstado.value;
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            if (categoria === "todos") {
                card.style.display = "grid";
            } else {
                card.style.display =

                    card.dataset.categoria === categoria ? "grid" : "none";
            }
        });

        modalFiltro.style.display = "none";
    });


    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === modalFiltro) modalFiltro.style.display = "none";
    });

    verificarEstado();
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Cerrar al hacer click en opción
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});