terraform {
  backend "s3" {
    bucket = "tetris-potsides-com-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }
}
