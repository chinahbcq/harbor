// Copyright (c) 2017 VMware, Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemAdminGuard } from './shared/route/system-admin-activate.service';
import { AuthCheckGuard } from './shared/route/auth-user-activate.service';
import { SignInGuard } from './shared/route/sign-in-guard-activate.service';
import { LeavingConfigRouteDeactivate } from './shared/route/leaving-config-deactivate.service';
import { MemberGuard } from './shared/route/member-guard-activate.service';

import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { HarborShellComponent } from './base/harbor-shell/harbor-shell.component';
import { ConfigurationComponent } from './config/config.component';

import { UserComponent } from './user/user.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { ResetPasswordComponent } from './account/password-setting/reset-password/reset-password.component';
import { GroupComponent } from './group/group.component';

import { TotalReplicationPageComponent } from './replication/total-replication/total-replication-page.component';
import { DestinationPageComponent } from './replication/destination/destination-page.component';
import { ReplicationPageComponent } from './replication/replication-page.component';

import { AuditLogComponent } from './log/audit-log.component';
import { LogPageComponent } from './log/log-page.component';

import { RepositoryPageComponent } from './repository/repository-page.component';
import { TagRepositoryComponent } from './repository/tag-repository/tag-repository.component';
import { TagDetailPageComponent } from './repository/tag-detail/tag-detail-page.component';
import { LeavingRepositoryRouteDeactivate } from './shared/route/leaving-repository-deactivate.service';

import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { MemberComponent } from './project/member/member.component';
import {ProjectLabelComponent} from "./project/project-label/project-label.component";
import { ProjectConfigComponent } from './project/project-config/project-config.component';
import { ProjectRoutingResolver } from './project/project-routing-resolver.service';

const harborRoutes: Routes = [
  { path: '', redirectTo: 'harbor', pathMatch: 'full' },
  { path: 'reset_password', component: ResetPasswordComponent },
  {
    path: 'harbor',
    component: HarborShellComponent,
    canActivateChild: [AuthCheckGuard],
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [SignInGuard]
      },
      {
        path: 'projects',
        component: ProjectComponent
      },
      {
        path: 'logs',
        component: LogPageComponent
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [SystemAdminGuard]
      },
      {
        path: 'groups',
        component: GroupComponent,
        canActivate: [SystemAdminGuard]
      },
      {
        path: 'registries',
        component: DestinationPageComponent,
        canActivate: [SystemAdminGuard]
      },
      {
        path: 'replications',
        component: TotalReplicationPageComponent,
        canActivate: [SystemAdminGuard],
        canActivateChild: [SystemAdminGuard],
      },
      {
        path: 'tags/:id/:repo',
        component: TagRepositoryComponent,
        canActivate: [MemberGuard],
        resolve: {
          projectResolver: ProjectRoutingResolver
        }
      },
      {
        path: 'projects/:id/repositories/:repo',
        component: TagRepositoryComponent,
        canActivate: [MemberGuard],
        canDeactivate: [LeavingRepositoryRouteDeactivate],
        resolve: {
          projectResolver: ProjectRoutingResolver
        }
      },
      {
        path: 'projects/:id/repositories/:repo/tags/:tag',
        component: TagDetailPageComponent,
        canActivate: [MemberGuard],
        resolve: {
          projectResolver: ProjectRoutingResolver
        },
      },
      {
        path: 'projects/:id',
        component: ProjectDetailComponent,
        canActivate: [MemberGuard],
        resolve: {
          projectResolver: ProjectRoutingResolver
        },
        children: [
          {
            path: 'repositories',
            component: RepositoryPageComponent
          },
          {
            path: 'repositories/:repo/tags',
            component: TagRepositoryComponent,
          },
          {
            path: 'replications',
            component: ReplicationPageComponent,
          },
          {
            path: 'members',
            component: MemberComponent
          },
          {
            path: 'logs',
            component: AuditLogComponent
          },
          {
            path: 'labels',
            component: ProjectLabelComponent
          },
          {
            path: 'configs',
            component: ProjectConfigComponent
          }
        ]
      },
      {
        path: 'configs',
        component: ConfigurationComponent,
        canActivate: [SystemAdminGuard],
        canDeactivate: [LeavingConfigRouteDeactivate]
      },
      {
        path: 'registry',
        component: DestinationPageComponent,
        canActivate: [SystemAdminGuard],
        canActivateChild: [SystemAdminGuard],
      }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(harborRoutes)
  ],
  exports: [RouterModule]
})
export class HarborRoutingModule {

}
