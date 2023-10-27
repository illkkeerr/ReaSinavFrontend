export class SidebarService{
    static dashboardNavigationIsOpen: boolean = false;
    static DashboardOpen() {
      this.dashboardNavigationIsOpen = true;
    }
    static DashboardClose() {
      this.dashboardNavigationIsOpen = false;
    }
    static setIsOpenLocalStorage(value: boolean) {
      localStorage.setItem("dashboardNavigationIsOpen", value.toString());
    }
      static getIsOpenLocalStorage() {
          return localStorage.getItem("dashboardNavigationIsOpen");
      }
}