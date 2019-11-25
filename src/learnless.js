import './less.less'
export const lesslearn = () => {
  var lesselement = document.createElement('div')
  lesselement.innerHTML = _.join(['Hello', 'less'], ' ')
  lesselement.classList.add('style');
  return lesselement
}