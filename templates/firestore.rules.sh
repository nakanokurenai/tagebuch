#!/bin/sh

cat <<EOC
service cloud.firestore {
  match /databases/{database}/documents {
    function isUserPriviledgedUser() {
      return request.auth.uid in ['$OWNER_UID']
    }

    match /system/{anyone=**} {
      allow read: if isUserPriviledgedUser();
      allow write: if false;
    }

    match /articles/{anyone=**} {
      allow read;
      allow write: if isUserPriviledgedUser()
    }

    match /{anyone=**} {
      allow read, write: if false;
    }
  }
}
EOC
