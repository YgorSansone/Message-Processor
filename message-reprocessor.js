function selectElement(selector) {
  return document.querySelector(selector);
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function clickButton(selector) {
  const button = selectElement(selector);
  if (button) {
    button.click();
    await wait(1000);
    return true;
  } else {
    console.log(`Botão não encontrado: ${selector}`);
    return false;
  }
}

async function markAsDelivered() {
  const selectAllButton = selectElement(".sc-iwjdpV.fcKBWx");
  if (selectAllButton) {
    selectAllButton.click();
    await wait(1000);
    await clickButton(".sc-bqiRlB.sc-ksdxgE.egaKyx.dOleDW");
    await wait(2000);
    return true;
  } else {
    console.log("Botão de seleção de mensagens não encontrado");
    return false;
  }
}

async function reloadPage() {
  await clickButton(".sc-bqiRlB.sc-ksdxgE.egaKyx.jkaEsj");
}
async function repeatProcess(maxCount) {
  let count = 0;
  while (count < maxCount) {
    try {
      console.log(`Reprocessando mensagens (${count + 1} de ${maxCount})`);
      const success = await markAsDelivered();
      if (success) {
        await wait(10000);
        await reloadPage();
        await wait(10000);
        count++;
      }
    } catch (error) {
      console.log(`Erro ao reprocessar mensagens: ${error}`);
    }
  }
}

repeatProcess(100);
