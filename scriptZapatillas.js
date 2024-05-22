
    document.addEventListener('DOMContentLoaded', function() {
        var composicionTrigger = document.getElementById('composicion-trigger');
        var composicionList = document.getElementById('composicion-list');

        composicionTrigger.addEventListener('click', function() {
            if (composicionList.style.display === 'none') {
                composicionList.style.display = 'block';
            } else {
                composicionList.style.display = 'none';
            }
        });
    });
