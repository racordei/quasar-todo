import { Dialog, Loading } from "quasar";

export function showErrorMessage(errorMessage) {
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}

export function showLoading(message) {
  Loading.show({ message })
}