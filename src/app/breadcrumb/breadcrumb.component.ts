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
    
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
     
        const root: ActivatedRoute = this.activatedRoute.root;
        
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): any {
   

 
    const children: ActivatedRoute[] = route.children;
   

 
    if (children.length === 0) {
     
      return breadcrumbs;
    }

 
    for (const child of children) {
      
      if (child.outlet !== PRIMARY_OUTLET) {   
        continue;
      }

    

     
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
     
      if (routeURL) {
      
        url += `/${routeURL}`;
      }

     
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data['breadcrumb'],
        params: child.snapshot.params,
        url: url
      };

      
        breadcrumbs.push(breadcrumb);
      

     

 
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}