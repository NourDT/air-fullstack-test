terraform {
  backend "s3" {
    bucket = "wteh-tf-remote-backend"
    key    = "appointment/dev"
    region = "ap-southeast-1"
    profile = "amplify-dev"
  }
}
