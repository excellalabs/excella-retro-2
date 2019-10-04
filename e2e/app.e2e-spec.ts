import { ExcellaRetroPage } from './app.po'

describe('excella-retro App', function() {
  let page: ExcellaRetroPage

  beforeEach(() => {
    page = new ExcellaRetroPage()
  })

  it('should display message saying app works', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('app works!')
  })
})
