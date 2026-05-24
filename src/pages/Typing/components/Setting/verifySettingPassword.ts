const SETTING_PASSWORD = '1490'
const PROMPT_MESSAGE = '请输入4位数字密码以保存设置修改'

export function verifySettingPassword() {
  if (typeof window.prompt === 'function') {
    return Promise.resolve(window.prompt(PROMPT_MESSAGE) === SETTING_PASSWORD)
  }

  return verifySettingPasswordWithDialog()
}

function verifySettingPasswordWithDialog() {
  return new Promise<boolean>((resolve) => {
    const overlay = document.createElement('div')
    overlay.style.cssText = [
      'position: fixed',
      'inset: 0',
      'z-index: 9999',
      'display: flex',
      'align-items: center',
      'justify-content: center',
      'background: rgba(0, 0, 0, 0.35)',
    ].join(';')

    const dialog = document.createElement('div')
    dialog.style.cssText = [
      'width: 320px',
      'border-radius: 12px',
      'background: #fff',
      'padding: 20px',
      'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25)',
      'color: #111827',
      'font-family: sans-serif',
    ].join(';')

    const title = document.createElement('div')
    title.textContent = '设置密码'
    title.style.cssText = 'font-size: 18px; font-weight: 700; margin-bottom: 8px;'

    const description = document.createElement('div')
    description.textContent = PROMPT_MESSAGE
    description.style.cssText = 'font-size: 13px; color: #4b5563; margin-bottom: 12px;'

    const input = document.createElement('input')
    input.type = 'password'
    input.inputMode = 'numeric'
    input.maxLength = 4
    input.autocomplete = 'off'
    input.style.cssText = [
      'width: 100%',
      'box-sizing: border-box',
      'border: 1px solid #d1d5db',
      'border-radius: 8px',
      'padding: 8px 10px',
      'font-size: 16px',
      'outline: none',
      'margin-bottom: 16px',
    ].join(';')

    const actions = document.createElement('div')
    actions.style.cssText = 'display: flex; justify-content: flex-end; gap: 8px;'

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.textContent = '取消'
    cancelButton.style.cssText = ['border: 0', 'border-radius: 8px', 'background: #e5e7eb', 'padding: 8px 14px', 'cursor: pointer'].join(
      ';',
    )

    const confirmButton = document.createElement('button')
    confirmButton.type = 'button'
    confirmButton.textContent = '确认'
    confirmButton.style.cssText = [
      'border: 0',
      'border-radius: 8px',
      'background: #6366f1',
      'color: #fff',
      'padding: 8px 14px',
      'cursor: pointer',
    ].join(';')

    function close(result: boolean) {
      overlay.remove()
      resolve(result)
    }

    cancelButton.addEventListener('click', () => close(false))
    confirmButton.addEventListener('click', () => close(input.value === SETTING_PASSWORD))
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        close(input.value === SETTING_PASSWORD)
      }
      if (event.key === 'Escape') {
        close(false)
      }
    })

    actions.append(cancelButton, confirmButton)
    dialog.append(title, description, input, actions)
    overlay.append(dialog)
    document.body.append(overlay)
    input.focus()
  })
}
