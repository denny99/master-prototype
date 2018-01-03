package de.uni.frankfurt.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "navigationController")
@RequestScoped
public class NavigationController {
  @ManagedProperty(value = "#{param.pageId}")
  private String pageId;

  public String moveToPage1() {
    return "page1";
  }

  public String moveToPage2() {
    return "page2";
  }

  public String moveToHomePage() {
    return "index";
  }

  public String showPage() {
    if (pageId == null) {
      return "index";
    }

    if (pageId.equals("1")) {
      return "page1";
    } else if (pageId.equals("2")) {
      return "page2";
    } else {
      return "index";
    }
  }

  public String getPageId() {
    return pageId;
  }

  public void setPageId(String pageId) {
    this.pageId = pageId;
  }
}