import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {

        const root: ActivatedRoute = this.activatedRoute.root;

        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  /**
   * 返回IBreadcrumb对象的数组
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): any {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';


    const children: ActivatedRoute[] = route.children;


   
    if (children.length === 0) {
    
      return breadcrumbs;
    }

 
    for (const child of children) {
     
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }


      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }


      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      
      if (routeURL) {

        url += `/${routeURL}`;
      }


      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      // 此处的 component 如果为 undefined，可能是因为懒加载，在查找时，没有找到 component 的值，
      // 所以当 component 为 undefined 的时候，就会又往数组里再追加一次，会重复
      if (child.component) {
        breadcrumbs.push(breadcrumb);
      }



     
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}