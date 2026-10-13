(() => {
  'use strict';
  document.querySelectorAll('[data-product-card]').forEach((card) => {
    const form = card.querySelector('[data-product-form]');
    const status = card.querySelector('[data-cart-status]');
    const inputs = [...form.querySelectorAll('input[name="weight"]')];
    const rows = [...form.querySelectorAll('.product-card__package')];
    const updateSelection = () => {
      rows.forEach((row) => {
        row.classList.toggle('product-card__package--selected', row.querySelector('input').checked);
      });
      status.textContent = '';
    };
    rows.forEach((row) => {
      row.addEventListener('click', (event) => {
        if (event.target.closest('button')) return;
        row.querySelector('input').checked = true;
        updateSelection();
      });
    });
    form.addEventListener('change', updateSelection);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const weight = event.submitter?.value || inputs.find((input) => input.checked).value;
      const selected = inputs.find((input) => input.value === weight);
      if (!selected) return;
      selected.checked = true;
      updateSelection();
      status.textContent = `Вы выбрали ${weight} г. Это демо: корзина не подключена.`;
    });
    updateSelection();
  });
})();
