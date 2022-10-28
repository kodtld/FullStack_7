const greenNotifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '5px'
  }
  
  const redNotifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '5px'
  }
  
  const notificationReducer = (state = [], action) => {
    switch(action.type) {
    case 'DISPLAY_NOTIF':
      return state = {
        content: action.data,
        style: greenNotifStyle
      }
    case 'DISPLAY_ERROR':
      return state = {
        content: action.data,
        style: redNotifStyle
      }
    case 'END':
      return state = []
    default:
      return state
    }
  }
  
  export const dispNotif = message => {
    return {
      type: 'DISPLAY_NOTIF',
      data: message
    }
  }
  
  export const dispError = message => {
    return {
      type: 'DISPLAY_ERROR',
      data: message
    }
  }
  
  export const end = () => {
    return {
      type: 'END'
    }
  }
  
  export default notificationReducer