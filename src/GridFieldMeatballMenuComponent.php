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

    public function getColumnContent($gridField, $record, $columnName)
    {
        GridFieldExtensions::include_requirements();
        $link = function ($action = null, $hash = null) use ($gridField, $record) {
            $link = Controller::join_links($gridField->Link('item'), $record->ID, $action);
            // @TODO hack workaround: && false here because some JS in the CMS is rewriting
            // a link with a hash in it to the page we're on _now_ #anchor, as opposed to
            // e.g link/set/here#anchor
            return $hash && false ? "$link#$hash" : $link;
        };
        $isVersioned = $record->hasExtension('SilverStripe\Versioned\Versioned');
        $isPublished = $isVersioned && $record->isPublished();
        //Draft and Published are NOT mutually exclusive; An older version can
        //be Published while there are further changes in Draft.
        $hasDraft = $isVersioned && !$record->latestPublished();
        $rootLevelTabs = [];
        //We expect that a tabbed list of fields will always have a singular root.
        $tabSet = $record->getCMSFields()->first();
        if ($tabSet instanceof TabSet) {
            $first = true;
            foreach ($tabSet->Tabs() as $tab) {
                if ($first && !$this->showFirstTab) {
                    $first = false;
                    continue;
                }
                $tabID = ($first) ? null : $tab->ID();
                $rootLevelTabs[] = ArrayData::create([
                    'Title' => $tab->Name,
                    'Link' => $link('edit', $tabID)
                ]);
                $first = false;
            }
        }
        $templateData = ArrayData::create([
            'Link' => $link(),
            'Title' => $record->Title,
            'Versioned' => $isVersioned,
            'Published' => $isPublished,
            'Draft' => $hasDraft,
            'RootTabs' => ArrayList::create($rootLevelTabs)
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
