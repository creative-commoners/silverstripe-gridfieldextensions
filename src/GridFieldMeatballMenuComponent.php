<?php

namespace Symbiote\GridFieldExtensions;

use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridField_ColumnProvider;
use SilverStripe\Forms\GridField\GridField_URLHandler;
use SilverStripe\Control\Controller;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;
use SilverStripe\View\SSViewer;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\TabSet;

class GridFieldMeatballMenuComponent implements
    GridField_ColumnProvider,
    GridField_URLHandler
{
    protected $showFirstTab = true;

    public function __construct($showFirstTab = true)
    {
        $this->showFirstTab = $showFirstTab;
    }

    public function augmentColumns($gridField, &$columns)
    {
        if (!in_array('Meatballs', $columns)) {
            $columns[] = 'Meatballs';
        }
    }

    public function getColumnsHandled($gridField)
    {
        return ['Meatballs'];
    }

    protected function getRenderData($gridField, $record)
    {
        $renderData = [];
        GridFieldExtensions::include_requirements();
        $link = function ($action = null, $hash = null) use ($gridField, $record) {
            $link = Controller::join_links($gridField->Link('item'), $record->ID, $action);
            // @TODO hack workaround: && false here because some JS in the CMS is rewriting
            // a link with a hash in it to the page we're on _now_ #anchor, as opposed to
            // e.g link/set/here#anchor
            return $hash && false ? "$link#$hash" : $link;
        };

        //We expect that a tabbed list of fields will always have a singular root.
        $tabSet = $record->getCMSFields()->first();
        if ($tabSet instanceof TabSet) {
            $rootLevelTabs = [];
            $first = true;
            foreach ($tabSet->Tabs() as $tab) {
                $tabID = ($first) ? null : $tab->ID();
                $rootLevelTabs[] = [
                    'Title' => $tab->Name,
                    'Link' => $link('edit', $tabID)
                ];
                $first = false;
            }
            if (!$this->showFirstTab) {
                array_shift($rootLevelTabs);
            }
            if ($rootLevelTabs) {
                $renderData[] = $rootLevelTabs;
            }
        }

        if ($record->hasExtension('SilverStripe\Versioned\Versioned')) {
            $versioningActions = [];
            if (!$record->latestPublished()) {
                $versioningActions[] = [
                    'Title' => 'Publish',
                    'Link' => $link('publish')
                ];
            }
            if ($record->isPublished()) {
                $versioningActions[] = [
                    'Title' => 'Unpublish',
                    'Link' => $link('unpublish')
                ];
            }
            $versioningActions[] = [
                'Title' => 'Delete',
                'Link' => $link('archive')
            ];
            $renderData[] = $versioningActions;
        }

        return $renderData;
    }

    public function getColumnContent($gridField, $record, $columnName)
    {
        $actions = json_encode($this->getRenderData($gridField, $record));
        $templateData = ArrayData::create([
            'Actions' => $actions
        ]);
        $template = SSViewer::get_templates_by_class($this, '', __CLASS__);
        return $templateData->renderWith($template);
    }

    public function getColumnAttributes($gridField, $record, $columnName)
    {
        return ['class' => 'grid-field__col-compact meatball-menu'];
    }

    public function getColumnMetadata($gridField, $columnName)
    {
        if ($columnName === 'Meatballs') {
            return ['title' => 'More Actions'];
        }
        return [];
    }

    public function getURLHandlers($gridField)
    {
        return [
            'item/$ID//publish' => 'handleRecordAction',
            'item/$ID//unpublish' => 'handleRecordAction',
            'item/$ID//archive' => 'handleRecordAction',
            'item/$ID' => 'handleRecordLink'
        ];
    }

    /**
     * Basically an overly condensed GridFieldDetailFrom::handleItem
     */
    public function handleRecordLink($gridField, $request)
    {
        $handlerClass = '\SilverStripe\Forms\GridField\GridFieldDetailForm_ItemRequest';
        $injector = Injector::inst();
        $requestHandler = $gridField->getForm()->getController();
        $record = $gridField->getList()->byID($request->param("ID")) ?: $injector->create($gridField->getModelClass());
        $handler = $injector->createWithArgs(
            $handlerClass,
            array($gridField, $this, $record, $requestHandler, 'Meatballs')
        );
        return $handler->handleRequest($request);
    }

    /**
     * Handle actions that don't require loading of a new page/panel/etc.
     */
    public function handleRecordAction($gridField, $request)
    {
        $record = $gridField->getList()->byID($request->param("ID"));
        return GridFieldRecordActionHandler::create($gridField, $record)->handleRequest($request);
    }

    // The following 3 null return functions implement an undefined interface expected by GridFieldDetailForm_ItemRequest

    public function getFields()
    {
        return null;
    }

    public function getValidator()
    {
        return null;
    }

    public function getItemEditFormCallback()
    {
        return null;
    }
}
