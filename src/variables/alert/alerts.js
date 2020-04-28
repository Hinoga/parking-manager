import izitoast from 'izitoast'

const getAssets = type => {
  switch (type) {
    case 'info':
      return {
        color: 'blue',
        urlIcon: './images/info.svg'
      }
    case 'warn':
      return {
        color: 'yellow',
        urlIcon: './images/warn.svg'
      }
    case 'success':
      return {
        color: 'green',
        urlIcon: './images/success.svg'
      }
    case 'error':
      return {
        color: 'red',
        urlIcon: './images/error.svg'
      }
    default:
      return {
        color: 'dark',
        urlIcon: './images/question.svg'
      }
  }
}

/**
 * @param {string} msg. Message to display.
 * @param {string} type. Message type.
 * @param {string} duration. Time in milliseconds to fading out
 */

export const snackMessage = (title, msg, type, duration) => {
  const config = getAssets(type)
  izitoast.show({
    title,
    message: msg,
    animateInside: true,
    color: config.color,
    // iconUrl: config.urlIcon,
    timeout: duration || 4000,
    messageSize: 15,
    zindex: 999
  })
}

export const questionMessage = (title, msg, type, cb) => {
  const config = getAssets(type)
  izitoast.question({
    timeout: 15000,
    close: true,
    overlay: true,
    zindex: 99999,
    title,
    // iconUrl: config.urlIcon,
    color: config.color,
    message: msg,
    animateInside: true,
    position: 'center',
    buttons: [
      [
        '<button><b>Si</b></button>',
        (instance, toast) => {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
          cb()
        },
        true
      ],
      [
        '<button>No</button>',
        (instance, toast) => {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
        }
      ]
    ]
  })
}
