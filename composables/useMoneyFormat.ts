export const useMoneyFormat = (amount: number) => {
  const fotmatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return fotmatter.format(amount).replace('₫', '').replaceAll('.', ',').trim()
}
