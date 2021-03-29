import ModalHeader from '../components/Tasks/Modals/Shared/ModalHeader'
import ModalTaskName from '../components/Tasks/Modals/Shared/ModalTaskName'
import ModalDueDate from '../components/Tasks/Modals/Shared/ModalDueDate'
import ModalDueTime from '../components/Tasks/Modals/Shared/ModalDueTime'
import ModalButtons from '../components/Tasks/Modals/Shared/ModalButtons'

export default {
  methods: {
    submitForm() {
      if (!this.taskToSubmit.dueDate) {
        this.taskToSubmit.dueTime = ''
      }
      this.submitTask()
      // this.$q.notify({
      //   color: 'green-4',
      //   textColor: 'white',
      //   icon: 'check',
      //   message: 'Submitted',
      // })
    },
  },
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButtons,
  },
}