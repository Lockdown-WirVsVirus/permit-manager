# GCP

## Service Accounts

* github-gcr as "GCLOUD_GCR_SERVICE_KEY"
  * Storage Admin
  * Storage Object Creator
  * Sotrage Object Viewer

> we do not want to give 'storage.buckets.create' therefore upload one image manually (`gcloud auth configure-docker eu.gcr.io`)
> export DOCKER_IMAGE_PERMIT_MANAGER=eu.gcr.io/$PROJECT_ID/permit-manager:master
> docker build . --tag $DOCKER_IMAGE_PERMIT_MANAGER
> docker push $DOCKER_IMAGE_PERMIT_MANAGER