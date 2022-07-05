import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule
    ]
})

export class MaterialModule {}