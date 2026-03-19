(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Look for checkboxes in the list table that are part of the 'published' field
        const resultTable = document.getElementById('result_list');
        if (!resultTable) return;

        resultTable.addEventListener('change', function(e) {
            if (e.target && e.target.type === 'checkbox' && e.target.name && e.target.name.includes('-published')) {
                const form = document.getElementById('changelist-form');
                if (form) {
                    // Give a slight delay so the user sees the click effect
                    setTimeout(() => {
                        // Find the save button (Unfold usually uses button tags)
                        const saveBtn = form.querySelector('button[name="_save"]') || 
                                      form.querySelector('input[name="_save"]') ||
                                      form.querySelector('button[type="submit"]');
                        if (saveBtn) {
                            saveBtn.click();
                        } else {
                            form.submit();
                        }
                    }, 300);
                }
            }
        });
    });
})();
