<script>
    const menuDia = document.getElementById('menu-dia');
    const flecha = document.getElementById('flecha-menu-dia');

    menuDia.addEventListener('show.bs.collapse', () => {
        flecha.classList.remove('bi-chevron-up');
        flecha.classList.add('bi-chevron-down');
    });

    menuDia.addEventListener('hide.bs.collapse', () => {
        flecha.classList.remove('bi-chevron-down');
        flecha.classList.add('bi-chevron-up');
    });
</script>
