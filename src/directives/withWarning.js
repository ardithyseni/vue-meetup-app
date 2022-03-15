
export default {

    bind (element, binding) {
        const message = binding.value || 'Are you sure you want to continue?'
        const color = binding.arg || 'blue'
        const { prevent } = binding.modifiers

        element.style.color = color
        element.style.borderColor = color

        element.__WithWarning__ =  () => {
            if (!prevent) {
                alert(message)
            }
        }

        element.addEventListener('click', element.__WithWarning__)

        // element.__AnnoyingInterval__ = setInterval(() => {
        //     console.log('Annoying Message')
        // }, 1000)

    },
    unbind (element) {
        // clearInterval(element.__AnnoyingInterval__)
        element.removeEventListener('click', element.__WithWarning__)
    }

}

