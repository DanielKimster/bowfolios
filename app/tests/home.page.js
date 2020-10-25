import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class HomePage {
  constructor() {
    this.pageId = '#home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sets the first name field to a new value, then checks that the update succeeded. */
  async setFirstName(testController, firstName) {
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', firstName);
    // Submit it.
    await testController.click('#home-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#firstName').value).eql(firstName);
  }

  /** Checks this page is displayed, then changes firstName field, checks update succeeded, then restores value. */
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    await this.setFirstName(testController, newFirstName);
    // Now restore original value.
    await this.setFirstName(testController, firstName);
  }
}

export const homePage = new HomePage();
