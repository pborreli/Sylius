/*
 * This file is part of the Sylius package.
 *
 * (c) Paweł Jędrzejewski
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function ( $ ) {
    'use strict';

    $(document).ready(function() {
        var deleteButton;

        $('.btn-confirm').click(function(e) {
            e.preventDefault();

            deleteButton = $(this);

            $('#confirmation-modal').modal('show');
        });

        $('#confirmation-modal .btn-danger').click(function(e) {
            e.preventDefault();
            var parentForm = deleteButton.parent();
            var redirect = parentForm.data('redirect');
            $.ajax({
                type: "DELETE",
                url: parentForm.attr('action'),
                data: { confirmed: "1", redirect: (redirect != null) },
                cache: false
            }).fail(function(jqXHR, textStatus) {
                $('.alert-js').addClass('alert-error');
                $('.alert-js').append(textStatus).removeClass('hidden');
            }).done(function(json) {
                if (redirect != null) {
                    window.location.href = redirect;

                    return;
                }
                $('#confirmation-modal').modal('hide');
                $('#'+json.id).remove();

                $('.alert-js').addClass('alert-'+json.flash.type);
                $('.alert-js').append(json.flash.message).removeClass('hidden');
            });
        });
    });
})( jQuery );
