  export function getTodayFormatteDate(){
    const today = new Date()
    const todayFormatted = today.toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'})

    return todayFormatted
  }