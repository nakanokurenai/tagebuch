#!/bin/bash

cat <<EOC
service firebase.storage {
  match /b/{bucket}/o {
    function isUserPriviledgedUser() {
      return request.auth.uid in ['$OWNER_UID']
    }

    match /attachments/{allPaths=**} {
      allow read;
      allow write: if request.auth.uid == request.resource.metadata['owner'] && isUserPriviledgedUser();
    }
  }
}
EOC
