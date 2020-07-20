import react from 'react';
import XCircle from 'react-feather';

const HelpModal = () => {
<h2 ref={_subtitle => (subtitle = _subtitle)}>Besoin d'aide ?<h2>
<Button color="secondary" size="sm" onClick={closeModal}>
<XCircle/>
<div>
                  Le mot de passe donne accès au voyage, il est nécessaire lors de la première
                  connexion pour s'authentifier au voyage uniquement. Il est modifiable
                  par le créateur du voyage uniquement.
                  <hr />
                  Le bouton "Modifier mes disponibilités" apparaît uniquement pour l'utilisateur
                  connecté quand celui-ci est selectionné dans la liste. Il suffit de changer ses
                  disponibilités dans le calendrier et cliquer sur "Modifier mes disponibilités" !

</div>
}
